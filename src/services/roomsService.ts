import { get } from "@/lib/api";

const listRoom = async (): Promise<any> => {
  return get("/rooms");
};

export { listRoom };
