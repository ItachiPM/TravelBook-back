export function registerActivationEmail(userId: string) {
  return `
  <h1>Witaj na platformie TravelBook</h1>
  <p>Juz tylko ostatnio krok dzieli cię od korzystania z naszej platformy</p>
  
  <p>Klinkinj w link poniżej aby aktywować swoje konto</p>
  <span>http://localhost:3001/auth/confirmRegister/${userId}</span>
  
  <p>Pozdrawiamy</p>
  <p>Zespol TravelBook</p>
  `;
}
