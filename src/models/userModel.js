const supabase = require('../server/supaBase.js');

exports.signUpUser = async (insert) => { 
    const { data, error } = await supabase
        .from('users')
        .insert(insert)
        .select('user_id, login')
        .maybeSingle();

    if (error) throw error.message;

    return data;
}

exports.signInUser = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('user_id, login, password')
        .eq('user_id', userId )
        .maybeSingle();

    if (error) throw error.message;

    return data;
}

exports.checkExistence = async (input) => {
    const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .or(input)
        .maybeSingle();

    if (error) throw error.message;

    return data;
}

exports.updateUser = async (userId, input) => {
    const { data, error } = await supabase
        .from('users')
        .update(input)
        .eq('user_id', userId)
        .select()
        .maybeSingle();

    if (error) throw error.message;

    return data;
}

exports.updateUser = async (userId, last, amount) => {
    const { data, error } = await supabase
        .from('friends')
        .select('friend_id, status, friends_friend_id_fkey(user_id, picture, login, name, surname, status)')
        .eq('user_id', userId)
        .gt('friend_id', last)
        .order('friend_id', { ascending: true })
        .limit(amount);

    if (error) throw error.message;

    if (!data.length) return [];

    const friendIds = data.map(item => item.friend_id);

    const { data: notifications, error: notifError } = await supabase
        .from('notifications')
        .select('sender_id')
        .eq('user_id', userId)
        .eq('type', 'message')
        .eq('status', true)
        .in('sender_id', friendIds); // zamiast match + group

    if (notifError) throw notifError.message;

    const unreadMap = new Map();
    notifications.forEach(n => {
        unreadMap.set(n.sender_id, (unreadMap.get(n.sender_id) || 0) + 1);
    });

    const mapped = data.map(item => {
        const senderId = item.friend_id;
        return {
            friend_id: senderId,
            is_blocked: item.status,
            user_id: item.friends_friend_id_fkey.user_id,
            login: item.friends_friend_id_fkey.login,
            name: item.friends_friend_id_fkey.name,
            surname: item.friends_friend_id_fkey.surname,
            picture: item.friends_friend_id_fkey.picture,
            is_active: item.friends_friend_id_fkey.status,
            unread_messages: unreadMap.get(senderId) || 0,
        };
    });

    return mapped;
};