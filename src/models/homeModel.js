const supabase = require('../server/supaBase.js');

exports.countItems = async (from) => {
    const { count, error } = await supabase
        .from(from)
        .select('*', { count: 'exact' })

    if (error) throw error.message;

    return count;
}