async function getBankDetails(ifscCode) {
    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
      if (!response.ok) throw new Error("Invalid IFSC Code");
      const data = await response.json();
      
      return {
        bankName: data.BANK,  
        branchName: data.BRANCH, 
      };
    } catch (error) {
      console.error("Error fetching bank details:", error.message);
      return null;
    }
  }
  
  getBankDetails("HDFC0000053").then((details) => console.log(details));
  