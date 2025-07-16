const config={
 env:{
    apiEndpoint:process.env.NEXT_PUBLIC_API_ENDPOINT,
    imageKit:{
        privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
        publicKey:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        endpointUrl:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_ENDPOINT
    },
    upshatsh:{
        redisUrl:process.env.UPSTASH_REDIS_REST_URL,
        rediToken:process.env.UPSTASH_REDIS_REST_TOKEN,
        qstashUrl:process.env.QSTASH_URL,
        qstashToken:process.env.QSTASH_TOKEN
    }

 }
}

export default config