import axios from 'axios';
import { getStateUrl } from "../../helpers/util";
export class FactoryController {

    public async getFactory(params) {
        try {
            const stateUrl = getStateUrl()
            const result = await axios({
                url: `${stateUrl}/${params.id}`,
                method: "GET",
                params: {},
                headers: { "Content-Type": "application/json" }
            })
            if(result.data) {
                    return { data: { status: 200, result: result.data, message: "Successfully persisted state" } };
            } else {
                    return result;
            }
        } catch (error) {
            throw (error)
        }
    }

    public async saveFactory(inputValue: any) {
        try {
            const stateUrl = getStateUrl()
            const state = [{
                key: inputValue.orderId,
                value: inputValue,
            }];
            const result = await axios({
                url: stateUrl,
                method: "POST",
                data: JSON.stringify(state),
                headers: { "Content-Type": "application/json" }
            })
            if(result.data) {
                return { data: { status: 200, message: "Successfully persisted state" } };
            } else {
                return result;
            }
        } catch (error) {
            throw (error)
        }
    }
}

