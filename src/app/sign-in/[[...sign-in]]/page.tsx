import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-brand-primary hover:bg-brand-primary/90 text-sm normal-case shadow-none",
              card: "bg-muted/50 border border-border backdrop-blur-xl",
              headerTitle: "text-foreground",
              headerSubtitle: "text-foreground/60",
              socialButtonsBlockButton: "bg-muted border border-border hover:bg-accent text-foreground",
              socialButtonsBlockButtonText: "text-foreground font-medium",
              socialButtonsProviderIcon: "text-foreground",
              dividerLine: "bg-border",
              dividerText: "text-foreground/40",
              formFieldLabel: "text-foreground/70",
              formFieldInput: "bg-background border-border text-foreground",
              footerActionText: "text-foreground/60",
              footerActionLink: "text-brand-primary hover:text-brand-primary/80"
            },
          }}
          routing="path"
          path="/sign-in"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}
