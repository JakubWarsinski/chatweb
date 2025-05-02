document.getElementById('load-more').addEventListener('click', async () => {
    const list = document.getElementById('friends-list');
    const items = list.querySelectorAll('li');
    const lastId = items[items.length - 1]?.dataset.id;

    const res = await fetch(`/user/friends?last=${lastId}`);
    const newFriends = await res.json();

    newFriends.forEach(friend => {
        const li = document.createElement('li');
        li.dataset.id = friend.friend_id;
        li.innerHTML = `
            <img src="${friend.picture}" alt="Avatar" />
            <div>
                <p>${friend.login}</p>
                <p>${friend.name} ${friend.surname}</p>
            </div>
            <div>
                ${friend.is_active
                    ? '<i class="fa-solid fa-face-smile"></i>'
                    : '<i class="fa-solid fa-face-dizzy"></i>'}
                <div>
                    <i class="fa-solid fa-comment"></i>
                    <p>${friend.unread_messages}</p>
                </div>
                <button><i class="fa-solid fa-ban"></i></button>
                <button><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        list.appendChild(li);
    });

    if (newFriends.length === 0) {
        document.getElementById('load-more').disabled = true;
        document.getElementById('load-more').innerText = 'Brak więcej znajomych';
    }
});