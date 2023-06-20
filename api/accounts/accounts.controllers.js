let accounts = require("../../accounts");
const Account = require("../../models/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.accountDelete = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.foundById(accountId);
    if (!foundAccount) {
      return res.status(404).json({ error: "Account not found" });
    }
    foundAccount.deleteOne();
    res.status(204).json({ error: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: "Account Not Found" });
  }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.foundById(accountId);
    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    foundAccount.findByIdAndUpdate(req.body);
  } catch (error) {
    res.status(500).json({ message: error });
  }

  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    foundAccount.funds = req.body.funds;
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    console.log(error);
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
