console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://fmxlnwinljgdtnaohowu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteGxud2lubGpnZHRuYW9ob3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NTY1OTIsImV4cCI6MjAxMjQzMjU5Mn0.q1LGNdb4kJFaB4u6J1MyA0SxhtxzUZx_b7RnDGMdOvc'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }
//bis hier ist es rein der code um auf die supabasedatenbank zuzugreifen
