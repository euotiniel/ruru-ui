// ! THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY IT MANUALLY.

import { Blocks_registry } from "@/registry/blocks";

import Login1 from "@/components/blocks/login-1";

export const blocks_registry: Blocks_registry[] = [
  {
    name: "login-1",
    files: ["login-1.tsx"],
    dependencies: ["react-hook-form", "@hookform/resolvers", "zod"],
    components: ["button", "input", "form"],
    type: "block:component",
    content: [
      '"use client";\n\n\nimport Image from "next/image";\n\nimport Link from "next/link";\nimport React from "react";\nimport { useForm } from "react-hook-form";\nimport { zodResolver } from "@hookform/resolvers/zod";\nimport { z } from "zod";\nimport { Button } from "ruru-ui/components/button";\nimport { Input, PasswordInput } from "ruru-ui/components/input";\nimport {\n  Form,\n  FormControl,\n  FormField,\n  FormLabel,\n  FormItem,\n  FormMessage,\n} from "ruru-ui/components/form";\n\nconst Login1 = (): React.ReactNode => {\n  const loginSchema = z.object({\n    email: z.string().email({ message: "Please enter a valid email address." }),\n    password: z\n      .string()\n      .min(8, { message: "Password must be at least 8 characters long." }),\n  });\n\n  const form = useForm<z.infer<typeof loginSchema>>({\n    resolver: zodResolver(loginSchema),\n    defaultValues: {\n      email: "",\n      password: "",\n    },\n  });\n\n  function onSubmit(values: z.infer<typeof loginSchema>) {\n    \n    console.log(values);\n  }\n\n  return (\n    <div className="flex items-center justify-center">\n      <div className="flex flex-col items-center w-96 border rounded-md bg-card p-4">\n        <div className="grid place-items-center">\n          <div className="flex items-center gap-4">\n            <img\n              className="dark:block hidden"\n              src={"https://ruru-ui.vercel.app/logo-white.png"}\n              alt="logo"\n              height={40}\n              width={40}\n            />\n            <img\n              className="dark:hidden block"\n              src={"https://ruru-ui.vercel.app/logo-black.png"}\n              alt="logo"\n              height={40}\n              width={40}\n            />\n            <span className="text-xl">Ruru UI</span>\n          </div>\n          <span className="text-sm text-muted-foreground mt-4">\n            Welcome back\n          </span>\n        </div>\n\n        <Form {...form}>\n          <form\n            onSubmit={form.handleSubmit(onSubmit)}\n            className="w-full space-y-2"\n          >\n            <div className="my-3">\n              <FormField\n                control={form.control}\n                name="email"\n                render={({ field }) => (\n                  <FormItem>\n                    <FormLabel>Email</FormLabel>\n                    <FormControl>\n                      <Input placeholder="john.doe@example.com" {...field} />\n                    </FormControl>\n                    <FormMessage />\n                  </FormItem>\n                )}\n              />\n\n              <FormField\n                control={form.control}\n                name="password"\n                render={({ field }) => (\n                  <FormItem>\n                    <FormLabel>Password</FormLabel>\n                    <FormControl>\n                      <PasswordInput placeholder="••••••••" {...field} />\n                    </FormControl>\n                    <FormMessage />\n                  </FormItem>\n                )}\n              />\n            </div>\n\n            <Link href={"#"} className="hover:underline text-xs">\n              Forgot password?\n            </Link>\n\n            <div className="py-4 w-full space-y-3">\n              <Button type="submit" className="w-full">\n                Login\n              </Button>\n              <Button\n                className="w-full"\n                variant={"secondary"}\n                onClick={() => console.log("Login with Github")}\n              >\n                Login with Github\n              </Button>\n            </div>\n\n            <Link\n              href={"#"}\n              className="hover:underline text-xs flex justify-center"\n            >\n              Don&apos;t have an account?\n            </Link>\n          </form>\n        </Form>\n      </div>\n    </div>\n  );\n};\n\nexport default Login1;\n',
    ],
    default_export: Login1,
  },
];
