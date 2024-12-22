import User from "@/models/User";

export class UserService {
    static async getUsers(page: number, limit: number) {
        const offset = (page - 1) * limit;
        try {
            const { count, rows } = await User.findAndCountAll({
                limit,
                offset,
                order: [["createdAt", "DESC"]],
            });
            return {
                data: rows,
                total: count,
                page,
                limit,
            };
        } catch (error) {
            throw new Error("获取用户数据失败");
        }
    }
}
