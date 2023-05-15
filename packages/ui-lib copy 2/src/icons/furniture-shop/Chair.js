import { jsx as _jsx } from "react/jsx-runtime";
const Chair = (props) => {
    return (_jsx("svg", { ...props, viewBox: "0 0 17 19", fill: "none", children: _jsx("path", { d: "M16.7383 7.79857C16.7383 7.2314 16.2769 6.76997 15.7099 6.76997H14.9514C14.3842 6.76997 13.9228 7.2314 13.9228 7.79857V9.06584L13.9227 11.3275C13.9227 11.3569 13.8989 11.3807 13.8695 11.3807H13.5679C13.4266 11.1063 13.1404 10.9181 12.811 10.9181H9.25058V10.1017H10.8687C11.44 10.1017 11.9863 9.85754 12.3673 9.43182C12.7482 9.0061 12.9305 8.43633 12.8674 7.86847L12.2511 2.32861C12.1375 1.30894 11.2784 0.540039 10.2525 0.540039H6.72029C5.69431 0.540039 4.83517 1.30894 4.72174 2.32861L4.62781 3.17278C4.61174 3.31752 4.71597 3.44785 4.86072 3.46405C5.00546 3.48012 5.13593 3.37575 5.15199 3.23114L5.24579 2.38684C5.32956 1.63469 5.96333 1.06738 6.72029 1.06738H10.2525C11.0094 1.06738 11.6433 1.63469 11.7269 2.38684L12.3432 7.92683C12.3898 8.34569 12.2553 8.76605 11.9742 9.08012C11.6933 9.3942 11.2903 9.57437 10.8687 9.57437H6.10396C5.6825 9.57437 5.27957 9.3942 4.99846 9.08012C4.71735 8.76605 4.5829 8.34569 4.62946 7.92683L5.03526 4.27924C5.05133 4.13463 4.9471 4.00417 4.80235 3.9881C4.65788 3.97203 4.52728 4.07626 4.51122 4.22101L4.10541 7.86847C4.04224 8.43633 4.22447 9.0061 4.60556 9.43182C4.98651 9.85754 5.53267 10.1017 6.10396 10.1017H7.72224V10.9181H4.16171C3.8324 10.9181 3.54607 11.1063 3.40475 11.3807H3.10318C3.07393 11.3807 3.05003 11.3569 3.05003 11.3275L3.0499 9.06584V7.79857C3.0499 7.2314 2.58847 6.76997 2.0213 6.76997H1.26297C0.695801 6.76997 0.234375 7.2314 0.234375 7.79857C0.234375 8.56075 0.794403 9.19466 1.52458 9.31056V11.3275C1.52458 12.198 2.23279 12.9061 3.10318 12.9061H3.83377C4.09662 13.1324 4.43829 13.2693 4.81142 13.2693H7.72224V15.5831H5.25252C4.04333 15.5831 3.05965 16.5668 3.05965 17.7759C3.05965 18.1973 3.40242 18.54 3.82375 18.54C4.24521 18.54 4.58798 18.1973 4.58798 17.7759C4.58798 17.4094 4.88599 17.1113 5.25252 17.1113H7.72224V17.7759C7.72224 18.1973 8.06502 18.54 8.48634 18.54C8.90781 18.54 9.25058 18.1973 9.25058 17.7759V17.1113H11.7203C12.0867 17.1113 12.3848 17.4094 12.3848 17.7758C12.3848 18.1971 12.7276 18.54 13.1489 18.54C13.5704 18.54 13.9132 18.1971 13.9132 17.7758C13.9132 16.5666 12.9294 15.5829 11.7203 15.5829H9.25058V13.2692H9.76488C9.91058 13.2692 10.0285 13.1512 10.0285 13.0055C10.0285 12.86 9.91058 12.7419 9.76488 12.7419H4.81142C4.27487 12.7419 3.8383 12.3053 3.8383 11.7688C3.8383 11.5905 3.98346 11.4453 4.16171 11.4453H12.811C12.9894 11.4453 13.1344 11.5905 13.1344 11.7688C13.1344 12.3053 12.698 12.7419 12.1613 12.7419H10.8205C10.675 12.7419 10.5569 12.86 10.5569 13.0055C10.5569 13.1512 10.675 13.2692 10.8205 13.2692H12.1613C12.5344 13.2692 12.8762 13.1323 13.1389 12.9061H13.8695C14.74 12.9061 15.4481 12.1979 15.4481 11.3275V9.31042C16.1784 9.19466 16.7383 8.56075 16.7383 7.79857V7.79857ZM8.98691 16.1104H11.7203C12.6386 16.1104 13.3858 16.8575 13.3858 17.7759C13.3858 17.9065 13.2795 18.0127 13.1489 18.0127C13.0183 18.0127 12.9122 17.9065 12.9122 17.7759C12.9122 17.1187 12.3774 16.5839 11.7203 16.5839H8.98691C8.8412 16.5839 8.72324 16.702 8.72324 16.8476V17.7759C8.72324 17.9065 8.61694 18.0127 8.48634 18.0127C8.35574 18.0127 8.24959 17.9065 8.24959 17.7759V16.8476C8.24959 16.702 8.13148 16.5839 7.98592 16.5839H5.25252C4.59526 16.5839 4.06064 17.1187 4.06064 17.7758C4.06064 17.9064 3.95435 18.0127 3.82375 18.0127C3.69315 18.0127 3.58699 17.9064 3.58699 17.7758C3.58699 16.8575 4.33406 16.1103 5.25252 16.1103H7.98592C8.13148 16.1103 8.24959 15.9923 8.24959 15.8466V13.2692H8.72324V15.8466C8.72324 15.9923 8.8412 16.1104 8.98691 16.1104V16.1104ZM0.761719 7.79857C0.761719 7.52213 0.986527 7.29732 1.26297 7.29732H2.0213C2.29774 7.29732 2.52255 7.52213 2.52255 7.79857V8.80217H1.76532C1.21188 8.80217 0.761719 8.35187 0.761719 7.79857ZM2.05193 11.3275V9.32951H2.52269V11.3275C2.52269 11.6476 2.78307 11.908 3.10318 11.908H3.31741C3.33279 12.0743 3.37537 12.2327 3.4406 12.3789H3.10318C2.52351 12.3788 2.05193 11.9072 2.05193 11.3275ZM8.24959 10.1017H8.72324V10.9181H8.24959V10.1017ZM13.8695 12.3788H13.5321C13.5973 12.2327 13.64 12.0742 13.6554 11.908H13.8695C14.1896 11.908 14.45 11.6476 14.45 11.3275L14.4501 9.32938H14.9208V11.3275C14.9208 11.9072 14.4492 12.3788 13.8695 12.3788ZM15.2074 8.80217H14.4501V7.79857C14.4501 7.52213 14.6749 7.29732 14.9512 7.29732H15.7097C15.9862 7.29732 16.211 7.52213 16.211 7.79857C16.211 8.35187 15.7608 8.80217 15.2074 8.80217Z", fill: "currentColor" }) }));
};
export default Chair;
