import User from "@/models/User";

export class UserService {

    /**
     * 获取用户列表
     * @param page 页码
     * @param limit 每页数量
     * @returns 用户列表
     */
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

    /**
     * 添加用户
     * @param user 用户数据
     * @returns 用户数据
     */
    static async createUser(userData: { username: string, email: string }) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw new Error("添加用户失败");
        }
    }
}