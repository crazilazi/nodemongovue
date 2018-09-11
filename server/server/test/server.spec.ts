import * as chai from "chai";
import { assert, expect } from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Users", () => {

    describe("Get all User", () => {
        it("should returns all the user in database", (done) => {
            chai.request("http://localhost:3000/")
                .get("careuser")
                // tslint:disable-next-line:max-line-length
                .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJsYWxNaTE2NXRYa1o4M1BsbFA1cS1md2F0SkNjWTJqOFhES0N3anhqNEhzIn0.eyJqdGkiOiIzMzZlNTA1ZS1lNDRmLTQwNjctOGQ2Ni02ZGY5Y2MwM2E1OTYiLCJleHAiOjE1Mzk3Njg5ODQsIm5iZiI6MCwiaWF0IjoxNTM5NzY4Njg0LCJpc3MiOiJodHRwczovL2lkZW50aXR5LmFoYy5vbmVhZHZhbmNlZC5pby9hdXRoL3JlYWxtcy9DYXJlcGxhbm5pbmdEZXYiLCJhdWQiOiJ0cmFpbmluZy1jb25zb2xlIiwic3ViIjoiNGE3MTc2MWUtNjQyNy00ODQzLWE4YmItNjlhNjU5MGIzMjZiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidHJhaW5pbmctY29uc29sZSIsIm5vbmNlIjoiYjlkZDM0YzUtMGM2Zi00OGI2LTgzN2ItZWZlNWQwZGU1MWY0IiwiYXV0aF90aW1lIjoxNTM5NzY4NjgyLCJzZXNzaW9uX3N0YXRlIjoiODMxMDc1OWUtOTI5Zi00ZWU1LWE3NDktMjQ0ZjU4OGY3ODAyIiwiYWNyIjoiMSIsImNsaWVudF9zZXNzaW9uIjoiY2YyYTcxMWUtYTMwYy00OTc2LThmMTAtMTE2ODQ2ZTgxMjJjIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6OTA5OCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidW1hX2F1dGhvcml6YXRpb24iLCJlbXBsb3llZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sIm5hbWUiOiJSb2NrIFN0YXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYWplZXYuY3NlMDRAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IlJvY2siLCJmYW1pbHlfbmFtZSI6IlN0YXIiLCJlbWFpbCI6InJhamVldi5jc2UwNEBnbWFpbC5jb20ifQ.OwhgBcb1g_qBEpf4tqq8WwugtMM7HOJFZfiJ_c0j5Yv-sP2DPjgJGH4JzCehZ1IPK8ryXNg4lQ8UFta7eNvZZ2khm1yT_Rdvni04Up34wZjUiBMMQbvw1PKVLXn1FE4y0Fq0s-sl-q5h2dheT30qVl1VgXajlMQPMC1ekLLHvXJ4I18ShX2vBkP-sZo68MWkFVt5CQi-PhYvflIiPoBaH-szED5uBZPkjEEMRU-lhcbRmY433x545nsYBlbL8yrmK1cj9XyylCxzRKFKlNkEFKT9A_kQ_gMc1mx_eDA5WRVCxVQ2hXkH7On7u6GzB4gtSY2XQxxDxq0DvCOlq4UU1A")
                .then((res) => {
                    console.log(res.text);
                    expect(res.status).to.equal(200);
                    const bodyObj = JSON.parse(res.text);
                    console.log(bodyObj.products.length);
                    expect(bodyObj.products.length).to.equal(100);
                    done();
                })
                .catch((error) => {
                    // your code
                    console.log(error);
                });
        });
    });
});
