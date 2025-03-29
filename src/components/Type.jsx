import Typewriter from "typewriter-effect";
const Type = ()=>{
 return(
<Typewriter
      options={{
        strings: [
          "Software Developer",
          "Freelancer",
          "Full Stack Developer",
          "Open Source Contributor",
          "UI Designer",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
 );
};

export default Type;