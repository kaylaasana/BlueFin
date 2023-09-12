import Swal from 'sweetalert2';
import Auth from './auth';
import { GET_USER_SCORES } from './queries';

export default function prompt(
  setScore,
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
    confirmButtonText: 'Save Current Score & Back to Menu',
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
      window.location.reload();
    } else if (result.isDenied) {
      setCountdown(20);
      resetScore();
    } else {
      setScore('Have fun');
    }
  });
}
