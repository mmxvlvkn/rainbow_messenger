import FetchService from './FetchService.js';

class InterceptorService {
    async authInterceptor(callback) {
        const data = await callback();
        if (!data.status) {
            return await FetchService.refresh().then(async data => {
                if (!data.status) {
                    return data;
                } else {
                    localStorage.setItem("accessToken", data.data.accessToken);
                    return (await callback());
                }
            });
        }

        return data;
    }
}
export default new InterceptorService();