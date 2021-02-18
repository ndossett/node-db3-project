// scheme-model
const db = require("../../data/db-config");

module.exports = {
    find() {
        return db("schemes");
    },
    findById(id) {
        return db("schemes").where({ id }).first();
    },
    findSteps(id) {
        return db("scheme as sc")
        .join("steps as st", "sc.id", "st.scheme_id")
        .select("sc.scheme_name", "st.instructions", "st.step_number")
        .where({ "sc.id" : id })
        .orderBy("st.step_number")
    },
    async add(schemedata) {
        return db("schemes").insert(schemedata, "id");
    },
    async update(id, changes) {
        const count = await db("schemes").where({ id }).update(changes);
        if (count) {
            return db("schemes").where({ id }).first();
        } else {
            return Promise.resolve(null);
        }
    },
    async remove(id) {
        const scheme = await db("schemes").where({ id }).first();
        if (!scheme) {
            return Promise.resolve(null)
            await db("schemes").where({ id }).del()
        } else {
            return Promise.resolve(scheme);
        }
}
};