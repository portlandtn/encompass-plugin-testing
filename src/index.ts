/// <reference path="./types/ice.d.ts" />

interface LoanData {
    validatedPayment: string | null;
}

let loanData: LoanData = {
    validatedPayment: null
}

elli.script.subscribe("loan", "open", async function onLoanOpen(args : any) {
    let loan = await elli.script.getObject("loan");
    loanData.validatedPayment = await loan.getField("5");
    console.log(`Loan Payment: ${loanData.validatedPayment}`);
});