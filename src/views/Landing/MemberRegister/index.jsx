import register from "@/assets/img/register.svg";
import RegistrationForm from "./components/RegistrationForm";
import Container from "@/utils/Container/Container";

const index = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 content-around">
        <div className="place-self-center">
          <img src={register} className="object-center mx-auto lg:w-96 object-contain" alt="" />
        </div>
        <div className="">
          <RegistrationForm />
        </div>
      </div>
    </Container>
  );
};

export default index;
