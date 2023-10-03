console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://mjtmfehzbqrxuemskwmz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qdG1mZWh6YnFyeHVlbXNrd216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMzI5OTUsImV4cCI6MjAxMTkwODk5NX0.FOL3k4l56bmEVUsxnooDJPpwgHB_lZgnvZUx78zLgts'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }