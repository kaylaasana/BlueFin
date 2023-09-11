import Swal from 'sweetalert2';

export default function prompt(score, setCountdown, resetScore) {

  Swal.fire({
    title: "Time's Up!",
    text: `Your final score: ${score}`,
    allowOutsideClick: false,
    showConfirmButton: true,
    confirmButtonText: 'Save Score & Try Again',
    showDenyButton: true,
    denyButtonText: "Don't Save & Try Again",
    showCancelButton: true,
    cancelButtonText: "I'd like to practice on my own",
  }).then((result) => {
    if (result.isConfirmed) {
      setCountdown(20);
      resetScore()
    } else if (result.isDenied) {
      setCountdown(20);
      resetScore();
    } else {
      console.log('dismiss');
    }
  });
}
