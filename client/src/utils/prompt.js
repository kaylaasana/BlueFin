import Swal from 'sweetalert2';
import Auth from './auth';

export default function prompt(
  score,
  setCountdown,
  resetScore,
  easyScore,
  hardScore,
  difficulty,
) {
  Swal.fire({
    title: "Time's Up!",
    text: `Your final score: ${score}`,
    allowOutsideClick: false,
    showConfirmButton: true,
    confirmButtonText: 'Save Current Score & Try Again',
    showDenyButton: true,
    denyButtonText: "Don't Save & Try Again",
    showCancelButton: true,
    cancelButtonText: "I'd like to practice on my own",
  }).then((result) => {
    if (result.isConfirmed) {
      setCountdown(20);
      resetScore();
      const { data } = Auth.getUser();
      console.log(Auth.getUser());
      if (difficulty == true) {
        easyScore({ variables: { userId: data._id, easyScore: score } });
      }
      hardScore({ variables: { userId: data._id, hardScore: score } });
    } else if (result.isDenied) {
      setCountdown(20);
      resetScore();
    } else {
      console.log('dismiss');
    }
  });
}
