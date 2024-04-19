const axios = require("axios");
const ethers = require("ethers");
const { providers } = require("ethers");

require("dotenv").config();

const API_URL = process.env.SEPOLIA_API_URL;
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const isDM = false;
const url = "http://localhost:8080/api";

const {
  abi,
} = require("../artifacts/contracts/DonationContract.sol/DonationContract.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const isDM2 = true;
const newComplaint = async (req, res) => {
  if (isDM2) {
    console.log("here", req.body);
  }
  try {
    const {
      userId,
      subject,
      description,
      ipfs,
      status,
      complaintType,
      statusType,
      authorityName,
      priority,
    } = req.body;
    // working with hardcoded, not workin with this
    const tx = await contractInstance.submitComplaint(
      userId,
      subject,
      description,
      complaintType,
      ipfs,
      status,
      statusType,
      authorityName,
      new Date().toISOString(),
      priority
    );
    const receipt = await tx.wait();
    const txHash = receipt.transactionHash;
    const getId = await contractInstance.getLatestComplaintId();
    const finalId = parseInt(getId);
    const complaint1 = await contractInstance.getComplaint(finalId);

    const obj = {
      event_id: "eg_1",
      event_type: "new_complaint_added",
      user_id: userId,
      tx_hash: txHash,
      sender_address: receipt.sender_address,
      complaint_title: subject,
      complaint_id: finalId,
      complaint_group_id: parseInt(complaint1[1]),
      event_created_date: " 2017-01-01 14:56:00",
      complaint_updated_at: " 2017-01-02 14:56:00",
      complaint_status: status,
      complaint_type: complaintType,
      complaint_created_by: userId,
      reporting_agency: authorityName,
      complaint_documents: "<url of marksheet or the actual marksheet>",
      agency_documents: "<optional field if agency responds with a document>",
      complaint_description: description,
      complaint_created_date: new Date().toISOString(),
      agency_response:
        "We are verifying your details. A department official will contact you shortly.",
      statusType: statusType,
      priority: priority,
      file_url: ipfs,
    };

    axios
      .post(url + "/webhook", obj)
      .then((response) => {
        console.log("Response:", response.status);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("done");
    res
      .status(200)
      .json({ success: true, tx: txHash, complaintGroupId: complaint1[1] });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getComplaintDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const complaint = await contractInstance.getComplaint(id);
    // const getId = await contractInstance.getLatestComplaintId();
    // const finalId = parseInt(getId);
    // console.log(finalId);
    console.log(complaint);
    const formattedObject = {
      userId: complaint[0],
      complaintGroupId: parseInt(complaint[1]),
      subject: complaint[2],
      description: complaint[3],
      complaintType: complaint[4],
      ipfs: complaint[5],
      authorityName: complaint[6],
      date: complaint[7],
      status: complaint[8],
      statusType: complaint[9],
      priority: parseInt(complaint[10]),
    };

    console.log(formattedObject);
    res.status(200).json(formattedObject);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateToAComplaint = async (req, res) => {
  console.log("here in update");
  // send group id
  try {
    const id = parseInt(req.params.id);
    const {
      userId,
      subject,
      description,
      complaintType,
      ipfs,
      status,
      statusType,
      authorityName,
      priority,
    } = req.body;
    const tx = await contractInstance.updateComplaint(
      userId,
      id,
      subject,
      description,
      complaintType,
      ipfs,
      status,
      statusType,
      authorityName,
      new Date().toISOString(),
      priority
    );
    const receipt = await tx.wait();
    const txHash = receipt.transactionHash;
    const getId = await contractInstance.getLatestComplaintId();
    const finalId = parseInt(getId);
    const obj = {
      event_id: "eg_1",
      event_type: "complaint_updated",
      user_id: userId,
      tx_hash: txHash,
      sender_address: receipt.sender_address,
      complaint_title: subject,
      complaint_id: finalId,
      complaint_group_id: id,
      event_created_date: new Date().toISOString(),
      complaint_updated_at: "2017-01-02 14:56:00",
      // complaint_status: " open",
      complaint_status: status,
      // complaint_type: " complaint",
      complaint_type: complaintType,
      // complaint_created_by: " user_id",
      complaint_created_by: userId,
      // reporting_agency: " police",
      reporting_agency: authorityName,
      complaint_documents: "<url of marksheet or the actual marksheet>",
      agency_documents: "<optional field if agency responds with a document>",
      // complaint_description:
      // " My original copy of marksheet has been lost. I want a new one.",
      complaint_description: description,
      complaint_created_date: new Date().toISOString(),
      agency_response:
        "We are verifying your details. A department official will contact you shortly.",
      statusType: statusType,
      priority: priority,
      file_url: ipfs,
    };
    const url = "http://localhost:8080/api";
    axios
      .post(url + "/webhook", obj)
      .then((response) => {
        console.log("Response:", response.status);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("done");
    res.status(200).json({ success: true, tx: txHash });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).send(error.message);
  }
};

const getComplaintByComplaintType = async (req, res) => {
  try {
    const { complaintType } = req.body;

    const tx = await contractInstance.getComplaintsByComplaintType(
      complaintType
    );

    // const hexList = array.map((item) => parseInt(item.hex));

    res.status(200).json(tx);
  } catch (err) {
    res.status(500).send("Get Complaint By Complaint Type Error\n", err);
  }
};

const getComplaintByAuthorityName = async (req, res) => {
  try {
    const { authorityName } = req.body;
    console.log("Authority Name : ", authorityName);
    const tx = await contractInstance.getComplaintsByAuthorityName(
      authorityName
    );
    // const receipt = await tx.wait();

    res.status(200).json(tx);
  } catch (err) {
    res.status(500).send("Get Complaint By Authority Name Error\n", err);
  }
};


const newDonation = async (req, res) => {
  try {
    let {
      userName,
      userEmail,
      userId,
      amount,
      message,
      fundraiseId,
    } = req.body;
    // fundraiseId = parseInt(fundraiseId);
    console.log(req.body)
    const tx = await contractInstance.donate(
      userName,
      userEmail,
      userId,
      amount,
      new Date().toISOString(),
      message,
      fundraiseId
    );
    console.log("receipt : ", tx);
    const receipt = await tx.wait();
    const txHash = receipt.transactionHash;
    const getId = await contractInstance.getDonationCount();
    const finalId = parseInt(getId);
    // const complaint1 = await contractInstance.getComplaint(finalId);

    const obj = {
      userName,
      userEmail,
      userId,
      txHash,
      senderAddress: receipt.sender_address,
      donationId: finalId,
      fundraiseId,
      donationAmount: amount,
      donationDate: new Date().toISOString(),
      donationMessage: message,
    };

    res.status(200).send({ success: true, data: obj });

  } catch (error) {
    console.log("error", error.message)
    res.status(500).send(error.message);
  }
}

const getDonationByFundraiseId = async (req, res) => {
  try {
    console.log(req.params)
    const fundraiseId = req.params.id;
    const tx = await contractInstance.getDonationsByFundraiseId(
      fundraiseId
    );
    console.log(tx)
    // console.log(tx[1][1].toNumber())
    // const receipt = await tx.wait();
    // console.log(receipt)
    // const txHash = receipt.transactionHash;
    let resultArray = [];
    const dataArray = tx;

    console.log(dataArray[0][0], dataArray[0][1], dataArray[0][2], dataArray[0][3].toNumber(), dataArray[0][4], dataArray[0][5], dataArray[0][6])
    for (let i = 0; i < dataArray.length; i++) {
      // console.log(fundraiseId)
      let obj = {
        userName: dataArray[i][0],
        userEmail: dataArray[i][1],
        userId: dataArray[i][2],
        amount: dataArray[i][3].toNumber(),
        date: dataArray[i][4],
        donationId: dataArray[i][5].toNumber(),
        message: dataArray[i][6],
        fundraiseId: fundraiseId,
      };
      // console.log("obj", obj)
      resultArray.push(obj);
      // console.log('ok')
    }

    res.status(200).json({ success: true, data: resultArray });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  newComplaint,
  getComplaintDetail,
  updateToAComplaint,
  getComplaintByAuthorityName,
  getComplaintByComplaintType,
  newDonation,
  getDonationByFundraiseId,
};
