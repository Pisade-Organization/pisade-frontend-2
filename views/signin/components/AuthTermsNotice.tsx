
export default function AuthTermsNotice() {
    return (
        <div className="text-neutral-400 text-center text-body-4">
            By clicking Log in or Continue with, you agree to <br />
            <span>
                <span className="underline hover:text-neutral-500 cursor-pointer">
                    Pisade Terms of Use
                </span>
                {" and "}
                <span className="underline hover:text-neutral-500 cursor-pointer">
                    Privacy Policy
                </span>
            </span>
        </div>
    );
}
