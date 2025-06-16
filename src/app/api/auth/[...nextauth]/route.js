import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
  CredentialsProvider({
    name: 'Credentials',
    
      email: { label: "Email", type: "text", placeholder: "Enter Email",
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      console.log(credentials)

                 // Add logic here to look up the user from the credentials supplied
    const user = await loginUser(credentials)
    console.log(user)
        if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
        } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

        }
    
    //   const res = await fetch("/your/endpoint", {
    //     method: 'POST',
    //     body: JSON.stringify(credentials),
    //     headers: { "Content-Type": "application/json" }
    //   })
    //   const user = await res.json()

    //   if (res.ok && user) {
    //     return user
    //   }
    //   return null
    }
  })
  ],
pages:{
         signIn: "/login"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }