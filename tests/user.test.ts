import { getClient } from "./utils";
import { gql } from "apollo-boost";

const client = getClient("");

describe("user", () => {
  let _id: string;
  it("simple sms sending", async () => {
    const createUser = gql`
      mutation {
        sendCode(
          input: { email: "zorofight94@gmail.com", phoneNumber: "09391981195" }
        ) {
          sms {
            status
            message
          }
        }
      }
    `;

    const response = await client.mutate({
      mutation: createUser,
    });

    expect(response.data.sendCode?.sms?.status).toBe(200);
  });

  it("simple user creation", async () => {
    const createUser = gql`
      mutation {
        createUser(
          input: {
            name: "test"
            userName: "test"
            email: "zorofight94@gmail.com"
            phoneNumber: "09391981195"
            image: "https://test.com/test.png"
            code: "test"
          }
        ) {
          token
          type
          _id
        }
      }
    `;

    const response = await client.mutate({
      mutation: createUser,
    });

    _id = response.data.createUser._id;

    expect(response.data.createUser.token).toBeDefined();
    expect(response.data.createUser.type).toBe("User");
    expect(response.data.createUser._id).toBeDefined();
  });

  it("make Ambassador", async () => {
    const createUser = gql`
      mutation {
        makeAmbassador(
          input: {
            _id: "${_id}"
            nationalCode: "test"
            instagram: "test"
            touristGuideCard: "test"
            guideType: NATIONAL
            expertise: CULTURAL
          }
        ) {
          token
          type
        }
      }
    `;

    const response = await client.mutate({
      mutation: createUser,
    });

    expect(response.data.makeAmbassador.token).toBeDefined();
    expect(response.data.makeAmbassador.type).toBe("Ambassador");
  });
});

