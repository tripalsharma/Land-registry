// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LandRegistry {
    struct Land {
        uint id;
        string location;
        uint area;
        address owner;
        bool isVerified;
        bool isForSale;
        uint price;
    }

    mapping(uint => Land) public lands;
    uint public landCount;

    event LandRegistered(uint id, address owner);
    event LandVerified(uint id);
    event LandMarkedForSale(uint id, uint price);
    event LandPurchased(uint id, address oldOwner, address newOwner, uint price);

    /// @notice Register new land (admin only)
    function registerLand(uint _id, string memory _location, uint _area) public {
        require(_id > 0, "ID must be > 0");
        require(bytes(_location).length > 0, "Location required");
        require(_area > 0, "Area must be > 0");
        require(lands[_id].owner == address(0), "Land already registered.");

        lands[_id] = Land({
            id: _id,
            location: _location,
            area: _area,
            owner: msg.sender,
            isVerified: false,
            isForSale: false,
            price: 0
        });

        landCount++;
        emit LandRegistered(_id, msg.sender);
    }

    /// @notice Verify a land (admin only)
    function verifyLand(uint _id) public {
        require(lands[_id].owner != address(0), "Land not found.");
        require(!lands[_id].isVerified, "Already verified.");

        lands[_id].isVerified = true;
        emit LandVerified(_id);
    }

    /// @notice Get details of a specific land
    function getLand(uint _id) public view returns (
        string memory, uint, address, bool, bool, uint
    ) {
        require(lands[_id].owner != address(0), "Land does not exist.");
        Land memory land = lands[_id];
        return (
            land.location,
            land.area,
            land.owner,
            land.isVerified,
            land.isForSale,
            land.price
        );
    }

    /// @notice Mark a verified land for sale (only owner)
    function markForSale(uint _id, uint _price) public {
        Land storage land = lands[_id];
        require(land.owner == msg.sender, "Only owner can sell.");
        require(land.isVerified, "Not verified.");
        require(!land.isForSale, "Already for sale.");
        require(_price > 0, "Price must be > 0");

        land.isForSale = true;
        land.price = _price;

        emit LandMarkedForSale(_id, _price);
    }

    /// @notice Buy land listed for sale
    function buyLand(uint _id) public payable {
        Land storage land = lands[_id];
        require(land.isForSale, "Not for sale.");
        require(msg.value >= land.price, "Insufficient payment.");
        require(msg.sender != land.owner, "Owner cannot buy.");

        address previousOwner = land.owner;

        // Update ownership
        land.owner = msg.sender;
        land.isForSale = false;
        land.price = 0;

        // Pay previous owner
        payable(previousOwner).transfer(msg.value);

        emit LandPurchased(_id, previousOwner, msg.sender, msg.value);
    }

    /// @notice Get all registered land IDs
    function getAllLandIds() public view returns (uint[] memory) {
        uint[] memory ids = new uint[](landCount);
        uint counter = 0;

        for (uint i = 1; i <= 10000; i++) {
            if (lands[i].owner != address(0)) {
                ids[counter] = i;
                counter++;
                if (counter == landCount) break;
            }
        }
        return ids;
    }

    /// @notice Get IDs of lands for sale
    function getLandForSaleIds() public view returns (uint[] memory) {
        uint count = 0;

        for (uint i = 1; i <= 10000; i++) {
            if (lands[i].isForSale) count++;
        }

        uint[] memory ids = new uint[](count);
        uint index = 0;

        for (uint i = 1; i <= 10000; i++) {
            if (lands[i].isForSale) {
                ids[index] = i;
                index++;
            }
        }

        return ids;
    }
}
