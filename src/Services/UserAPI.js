

export const fetchUser = async(id) => {
    return fetch("/user.json")
        .then((res) => {
            if(!res.ok) throw new Error()
            return res.json();
        })
        .then((json) => {
            return json[0]
        })
        .catch((err) => {
            console.error(err);
            throw err;
        })
}