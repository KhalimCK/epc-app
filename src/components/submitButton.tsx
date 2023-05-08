interface SubmitButtonProps {
  buttonDisabled: boolean;
  redirectFunc: () => void;
}

const SubmitButton = ({ buttonDisabled, redirectFunc }: SubmitButtonProps) => {
  return (
    <button
      type="button"
      disabled={buttonDisabled}
      onClick={redirectFunc}
      className="focus:shadow-outline mt-3 rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none disabled:opacity-25 disabled:hover:bg-purple-500"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
