export function getPotentailChats(allUsers, allChats, userId) {
    const pChats = allUsers.filter((user) => {
        let isChatCreated = false;
        if (userId === user._id) return false;
        if (allChats) {
            isChatCreated = allChats?.some((chat) => {
                return (
                    chat.members[0] === user._id || chat.members[1] === user._id
                );
            });
        }
        return !isChatCreated;
    });
    return pChats;
}
