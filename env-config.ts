import zod from 'zod';

const environmentSchema = zod.object({
	CLIENT_ID: zod.string().min(5),
	SERVER_URL: zod.string().min(5)
})

export const env = environmentSchema.parse({
	CLIENT_ID: process.env.CLIENT_ID,
	SERVER_URL: process.env.SERVER_URL
})
