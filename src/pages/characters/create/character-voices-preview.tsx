import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VoicePreview } from "@/components/common/voice-preview"
import { Search, RotateCcw } from "lucide-react"
import { useFilterVoicesQuery } from "@/api/audio"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface VoiceSelectorProps {
  value?: string
  onChange: (voiceId: string) => void
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function VoiceSelector({ value, onChange }: VoiceSelectorProps) {
  const [selectedVoice, setSelectedVoice] = useState<string>(value || "")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const [searchField, setSearchField] = useState<"name" | "age" | "accent" | "gender">("name")

  const ITEMS_PER_PAGE = 5

  // Debounce search value by 300ms
  const debouncedSearch = useDebounce(searchValue, 300)

  // Fetch all voices once (no query params)
  const { data, isLoading } = useFilterVoicesQuery({})

  const allVoices = data?.body?.body?.data || []

  // Filter voices locally with debounced search
  const filteredVoices = useMemo(() => {
    if (!debouncedSearch.trim()) return allVoices

    return allVoices.filter((voice) => {
      const fieldValue = searchField === "name" 
        ? voice.name 
        : voice.labels[searchField]
      
      return fieldValue?.toLowerCase().includes(debouncedSearch.toLowerCase())
    })
  }, [allVoices, debouncedSearch, searchField])

  // Paginate filtered results
  const paginatedVoices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredVoices.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredVoices, currentPage])

  const totalPages = Math.ceil(filteredVoices.length / ITEMS_PER_PAGE)

  const handleReset = () => {
    setSearchValue("")
    setSearchField("name")
    setCurrentPage(1)
    setSelectedVoice("")
    onChange("")
  }

  const handleVoiceSelect = (voiceId: string) => {
    const newSelection = voiceId === selectedVoice ? "" : voiceId
    setSelectedVoice(newSelection)
    onChange(newSelection)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Reset to page 1 when debounced search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, searchField])

  return (
    <div className="w-full space-y-4">
      {/* Filter Bar */}
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search by ${searchField}...`}
            className="pl-10"
          />
        </div>

        <Select value={searchField} onValueChange={(value: "name" | "age" | "accent" | "gender") => setSearchField(value)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="age">Age</SelectItem>
            <SelectItem value="accent">Accent</SelectItem>
            <SelectItem value="gender">Gender</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Voices Table */}
      {isLoading ? (
        <div className="text-center py-8">Loading voices...</div>
      ) : paginatedVoices.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {debouncedSearch ? "No voices found" : "No voices available"}
        </div>
      ) : (
        <>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVoices.map((voice) => (
                  <TableRow
                    key={voice._id}
                    className={`cursor-pointer ${selectedVoice === voice.voice_id ? "bg-primary/30" : "hover:bg-muted/50"}`}
                    onClick={() => handleVoiceSelect(voice.voice_id)}
                  >
                    <TableCell className="font-medium">{voice.name}</TableCell>
                    <TableCell className="min-w-24">
                      <VoicePreview src={voice.preview_url} />
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {voice.labels.age} • {voice.labels.gender} • {voice.labels.accent}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>

              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}