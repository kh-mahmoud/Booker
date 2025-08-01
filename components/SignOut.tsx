import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo:"/sign-in"})
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}