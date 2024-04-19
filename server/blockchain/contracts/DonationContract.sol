// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DonationContract {
    struct Donation {
        string userId;
        string userName;
        string userEmail;
        uint256 amount;
        string date;
        uint256 donationId;
        string message;
        string fundraiseId; // Changed fundraiseId to string
    }

    mapping(uint256 => Donation) public donations;
    uint256 public donationCount;
    mapping(string => Donation[]) public donationsByFundraiseId; // Changed type of key to string

    event NewDonation(
        string userId,
        string userName,
        string userEmail,
        uint256 amount,
        string date,
        uint256 donationId,
        string message,
        string fundraiseId
    );

    function donate(
        string memory _userId,
        string memory _userName,
        string memory _userEmail,
        uint256 _amount,
        string memory _date,
        string memory _message,
        string memory _fundraiseId // Changed type to string
    ) public {
        donationCount++;
        donations[donationCount] = Donation(
            _userId,
            _userName,
            _userEmail,
            _amount,
            _date,
            donationCount,
            _message,
            _fundraiseId
        );
        donationsByFundraiseId[_fundraiseId].push(donations[donationCount]);
        emit NewDonation(
            _userId,
            _userName,
            _userEmail,
            _amount,
            _date,
            donationCount,
            _message,
            _fundraiseId
        );
    }

    function getDonationsByFundraiseId(
        string memory _fundraiseId // Changed type to string
    ) public view returns (Donation[] memory) {
        return donationsByFundraiseId[_fundraiseId];
    }

    function getDonation(
        uint256 _donationId
    )
        public
        view
        returns (
            string memory userId,
            string memory userName,
            string memory userEmail,
            uint256 amount,
            string memory date,
            uint256 donationId,
            string memory message,
            string memory fundraiseId // Changed type to string
        )
    {
        Donation memory donation = donations[_donationId];
        return (
            donation.userId,
            donation.userName,
            donation.userEmail,
            donation.amount,
            donation.date,
            donation.donationId,
            donation.message,
            donation.fundraiseId
        );
    }

    function getDonationCount() public view returns (uint256) {
        return donationCount;
    }
}
