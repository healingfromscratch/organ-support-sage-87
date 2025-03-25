
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

type PrintButtonProps = {
  onSendEmail: (email: string) => Promise<void>;
};

const PrintButton = ({ onSendEmail }: PrintButtonProps) => {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: { email: string }) => {
    setIsSubmitting(true);
    try {
      await onSendEmail(data.email);
      toast({
        title: "Email Sent",
        description: "Your personalized guide has been sent to your email.",
      });
      setIsEmailFormOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 text-center no-print">
      {!isEmailFormOpen ? (
        <Button 
          onClick={() => setIsEmailFormOpen(true)}
          className="bg-sage-500 hover:bg-sage-600 text-white"
        >
          Email Me My Personalized Guide
          <Mail className="h-4 w-4" />
        </Button>
      ) : (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg border border-sage-200 shadow-sm">
          <h4 className="text-sage-800 font-medium mb-4">Enter your email</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email address</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEmailFormOpen(false)}
                  className="text-sage-700"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-sage-500 hover:bg-sage-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Email"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PrintButton;
