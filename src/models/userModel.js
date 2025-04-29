const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) throw error.message;
    
    return data;
};

exports.signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) throw error.message;
    
    return data;
};