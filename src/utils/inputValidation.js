const z = require("zod");

const signupSchema = z.object({
    name: z.string().min(2, { message: "Must be 2 or more characters long" }),
    email: z.string().email({ message: "Must be valid Email" }),
    password: z
        .string()
        .min(5, { message: "Must be 5 or more characters long" }),
});

const loginSchema = z.object({
    email: z.string().email({ message: "Must be valid Email" }),
    password: z
        .string()
        .min(5, { message: "Must be 5 or more characters long" }),
});

module.exports = { signupSchema, loginSchema };
