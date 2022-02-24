import kavenegar from "kavenegar";

export const getKavenegarApi = () => {
  const { KAVENEGAR_API_KEY } = process.env;
  return kavenegar.KavenegarApi({
    apikey: KAVENEGAR_API_KEY,
  });
};

export const sendMessage = async (data: {
  token: string;
  template: string;
  receptor: string;
}): Promise<{
  entries?: kavenegar.IEntrie[];
  status: number;
  message: string;
}> => {
  const kavenegarApi = getKavenegarApi();

  return new Promise((res) => {
    kavenegarApi.VerifyLookup(data, (entries, status, message) => {
      res({ entries, status, message });
    });
  });
};
