"use client";

import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaComment,
  FaReply,
  FaTrash,
} from "react-icons/fa";
import {
  useGetEpisodeCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentRepliesQuery,
} from "@/api/comment";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export function CommentSection({ episodeId }: { episodeId: string }) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const limit = 20;

  const { data, isLoading } = useGetEpisodeCommentsQuery({
    episodeId,
    sortBy,
    page,
    limit,
  });

  const comments = data?.body?.comments ?? [];
  const totalPages = data?.body?.pages ?? 1;

  // CREATE COMMENT / REPLY
  const [createComment] = useCreateCommentMutation();
  const [newComment, setNewComment] = useState("");

  // DELETE COMMENT
  const [deleteComment] = useDeleteCommentMutation();

  // REPLY MODE STATE
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const [replyToUserId, setReplyToUserId] = useState<string | null>(null);
  const [replyToName, setReplyToName] = useState<string | null>(null);

  // TRACK WHICH COMMENT's REPLIES ARE OPEN
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});

  const isReplying = parentCommentId !== null;

  const startReply = (comment: any) => {
    setParentCommentId(comment._id);
    setReplyToUserId(comment.userId._id);
    setReplyToName(comment.userId.fullName);
    setNewComment("");
  };

  const cancelReply = () => {
    setParentCommentId(null);
    setReplyToUserId(null);
    setReplyToName(null);
    setNewComment("");
  };

  const toggleReplies = (commentId: string) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment({ commentId }).unwrap();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const payload: any = {
      episodeId,
      content: newComment,
    };

    if (isReplying) {
      payload.parentCommentId = parentCommentId;
      payload.replyToUserId = replyToUserId;
    }

    await createComment(payload);
    setNewComment("");
    cancelReply();
  };

  return (
    <div className="flex flex-col h-full border rounded-lg">

      {/* HEADER */}
      <div className="flex items-center justify-between p-3 border-b dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
        <span className="font-semibold">Comments</span>

        <div className="flex items-center gap-3">
          {/* Pagination */}
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-full"
            >
              <FaChevronLeft size={14} />
            </Button>

            <Button
              size="icon"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full"
            >
              <FaChevronRight size={14} />
            </Button>
          </div>

          {/* Sort */}
          <Select
            defaultValue={sortBy}
            onValueChange={(v) => setSortBy(v as "newest" | "oldest")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* COMMENT LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3">
        {isLoading ? (
          <div className="text-center text-neutral-500">Loading...</div>
        ) : comments.length > 0 ? (
          comments.map((c: any) => (
            <CommentItem
              key={c._id}
              comment={c}
              startReply={startReply}
              openReplies={openReplies[c._id]}
              toggleReplies={toggleReplies}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400 gap-2 py-10">
            <FaComment size={26} />
            <span>No comments yet</span>
          </div>
        )}
      </div>

      {/* INPUT AREA */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 p-3 border-t dark:border-neutral-700"
      >
        {isReplying && (
          <div className="flex items-center justify-between text-sm text-blue-500">
            <span>
              Replying to <strong>{replyToName}</strong>
            </span>

            <button
              type="button"
              onClick={cancelReply}
              className="text-red-500 text-xs"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={isReplying ? "Write a reply..." : "Write a comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <Button type="submit" className="px-4">
            {isReplying ? "Reply" : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* -------------------------- COMMENT ITEM -------------------------- */

function CommentItem({
  comment,
  startReply,
  openReplies,
  toggleReplies,
  handleDelete,
}: any) {

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: replies, isLoading } = useGetCommentRepliesQuery(
    { commentId: comment._id, limit: 9999, page: 1 },
    { skip: !openReplies }
  );

  return (
    <div className="flex flex-col p-3 border rounded-lg bg-neutral-50 dark:bg-neutral-800">
      <div className="flex items-center justify-between">
        {/* User info */}
        <div className="flex items-center gap-3">
          <img
            src={comment.userId.profilePic}
            className="w-9 h-9 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="font-semibold">{comment.userId.fullName}</span>
            <span className="text-xs text-neutral-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center">
          {/* Reply */}
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-500 hover:text-blue-600"
            onClick={() => startReply(comment)}
          >
            <FaReply size={14} />
          </Button>

          {/* Delete */}
          {user?._id === comment.userId._id && <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={() => handleDelete(comment._id)}
          >
            <FaTrash size={14} />
          </Button>}
        </div>
      </div>

      {/* Content */}
      <p className="mt-2 text-sm dark:text-neutral-300">{comment.content}</p>

      {/* Show Replies */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleReplies(comment._id)}
        className="self-start text-blue-500 px-0 mt-1 h-6"
      >
        {openReplies
          ? "Hide replies"
          : `View replies (${comment.repliesCount})`}
      </Button>

      {/* Replies */}
      {openReplies && (
        <div className="ml-6 mt-2 space-y-2">
          {isLoading ? (
            <p className="text-neutral-500 text-sm">Loading replies...</p>
          ) : replies?.body?.replies?.length ? (
            replies.body.replies.map((r: any) => (
              <div
                key={r._id}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700"
              >
                <div className="font-semibold text-sm">
                  {r.userId.fullName}
                </div>
                <div className="text-xs text-neutral-400">
                  {new Date(r.createdAt).toLocaleString()}
                </div>
                <div className="text-sm mt-1">{r.content}</div>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 text-sm">No replies.</p>
          )}
        </div>
      )}
    </div>
  );
}
