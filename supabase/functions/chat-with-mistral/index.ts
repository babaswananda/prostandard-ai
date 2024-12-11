import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const MISTRAL_API_KEY = Deno.env.get('MISTRAL_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    })
  }

  try {
    const { messages } = await req.json()

    // Add Pro Standard context to the system message
    const systemMessage = {
      role: "system",
      content: `You are a luxury athletic wear specialist for Pro Standard. You help customers find the perfect team gear, focusing on our premium collections including NFL, NBA, MLB, and College wear. Always maintain a professional, helpful tone and include relevant product links from our collections. When discussing products, emphasize our commitment to quality materials and authentic team designs.

Key collections to reference:
- NFL Week 14 Best in Division: www.brandboom.com/app/a/81598162307
- NBA Collection: www.brandboom.com/app/a/37C6DC6066D
- MLB Collection: www.brandboom.com/app/a/D2DD62A764D
- College Collection: www.brandboom.com/app/a/AC4A7D8952C
- WINGSPAN Holiday Collection: www.brandboom.com/app/a/E309C507924
- PENNANTS Collection: www.brandboom.com/app/a/28D699E1686
- Sneaker Tie Backs: www.brandboom.com/app/a/9B78CADB770
- MASH UP Classics: www.brandboom.com/app/a/1EB1F5270F7`
    }

    // Prepare messages array with system message
    const fullMessages = [systemMessage, ...messages]

    console.log('Sending request to Mistral:', { messages: fullMessages })

    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: fullMessages,
        temperature: 0.7,
        stream: true,
      }),
    })

    if (!mistralResponse.ok) {
      const error = await mistralResponse.json()
      console.error('Mistral API error:', error)
      throw new Error(error.message || 'Error from Mistral API')
    }

    // Return the streaming response with proper headers
    return new Response(mistralResponse.body, {
      status: 200,
      headers: { 
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })

  } catch (error) {
    console.error('Error in chat-with-mistral function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})