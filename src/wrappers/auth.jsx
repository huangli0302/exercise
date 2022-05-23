import { Redirect } from 'umi'

export default (props) => {
  const { isLogin } = {isLogin:localStorage.getItem('isLogin')};
  console.log(111,props);
  if (isLogin) {
    return <>{ props.children }</>;
  } else {
    return <Redirect to="login" />;
  }
}