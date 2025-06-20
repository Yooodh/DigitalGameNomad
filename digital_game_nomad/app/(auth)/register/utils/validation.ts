export const isValidEmailFormat = (email: string): boolean => {
  return /^[a-zA-Z0-9]+(?:[\._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*(?:\.[a-zA-Z]{2,})+$/.test(
    email
  );
};

export const isValidPasswordFormat = (password: string): boolean =>
  /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()\-_+=|\[\]{};:'",.<>/?`~])[0-9a-zA-Z!@#$%^&*()\-_+=|\[\]{};:'",.<>/?`~]{8,16}$/.test(
    password
  );

export const isValidNameFormat = (name: string): boolean =>
  /^[가-힣a-zA-Z]+$/.test(name);

export const isValidNicknameFormat = (nickname: string): boolean =>
  /^[가-힣a-zA-Z0-9]+$/.test(nickname);

export const isValidPhoneFormat = (phone: string): boolean =>
  /^[0-9]{11}$/.test(phone);
