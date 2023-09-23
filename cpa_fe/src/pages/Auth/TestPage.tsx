import i18n from '../../i18n';
import Button from '@mui/material/Button';

export default function TestPage() {
  async function test() {
    const loginUrl = new URL('auth/test', import.meta.env.VITE_API_URL);
    const result = await fetch(loginUrl, {
      method: 'GET',
      headers: {
        'Accept-language': i18n.language,
        'Content-type': 'application/json',
      },
    });

    if (result.status === 200) {
      const res = await result.text();
      console.log(res);
      return;
    }
  }

  return <Button onClick={() => test()}>Kako ide poso</Button>;
}
