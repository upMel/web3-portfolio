// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Portfolio
 * @dev Stores portfolio project entries on-chain. Only the owner can add/remove items.
 */
contract Portfolio is Ownable {
    struct Project {
        uint256 id;
        string name;
        string description;
        string url;
        uint256 createdAt;
        bool active;
    }

    uint256 private _nextId = 1;
    mapping(uint256 => Project) private _projects;
    uint256[] private _projectIds;

    event ProjectAdded(uint256 indexed id, string name);
    event ProjectRemoved(uint256 indexed id);

    constructor() Ownable(msg.sender) {}

    function addProject(
        string calldata name,
        string calldata description,
        string calldata url
    ) external onlyOwner returns (uint256) {
        uint256 id = _nextId++;
        _projects[id] = Project({
            id: id,
            name: name,
            description: description,
            url: url,
            createdAt: block.timestamp,
            active: true
        });
        _projectIds.push(id);
        emit ProjectAdded(id, name);
        return id;
    }

    function removeProject(uint256 id) external onlyOwner {
        require(_projects[id].active, "Project does not exist");
        _projects[id].active = false;
        emit ProjectRemoved(id);
    }

    function getProject(uint256 id) external view returns (Project memory) {
        require(_projects[id].active, "Project does not exist");
        return _projects[id];
    }

    function getAllProjects() external view returns (Project[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _projectIds.length; i++) {
            if (_projects[_projectIds[i]].active) count++;
        }
        Project[] memory result = new Project[](count);
        uint256 idx = 0;
        for (uint256 i = 0; i < _projectIds.length; i++) {
            if (_projects[_projectIds[i]].active) {
                result[idx++] = _projects[_projectIds[i]];
            }
        }
        return result;
    }

    function projectCount() external view returns (uint256) {
        return _projectIds.length;
    }
}
