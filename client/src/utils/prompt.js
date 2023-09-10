import Swal from "sweetalert2"

let prompt = Swal.fire(
  {
  title: "Time's Up!",
  text: `Your final score: ${score}`,
  allowOutsideClick: false,
  showConfirmButton: true,
  confirmButtonText: 'Save Score & Try Again',
  showDenyButton: true,
  denyButtonText: "Don't Save & Try Again",
  showCancelButton: true,
  cancelButtonText: "I'd like to practice on my own",
});