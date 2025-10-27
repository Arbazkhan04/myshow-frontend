import { useForm } from "react-hook-form"
import { VoiceSelector } from "./character-voices-preview"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

interface DemoForm {
  voiceId: string
}

export function DemoForm() {
  const form = useForm<DemoForm>({
    defaultValues: {
      voiceId: ""
    }
  })

  const onSubmit = (data: DemoForm) => {
    console.log("Selected voice:", data.voiceId)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl w-full">
        <FormField
          control={form.control}
          name="voiceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Voice</FormLabel>
              <FormControl>
                <VoiceSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button type="submit">Submit</Button>
        
        {form.watch("voiceId") && (
          <div className="text-sm text-muted-foreground">
            Selected Voice ID: {form.watch("voiceId")}
          </div>
        )}
      </form>
    </Form>
  )
}