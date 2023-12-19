export async function getVotingPower(account: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/user/voting-power/${account}`,
    requestOptions
  );
}

export async function createVotingPower(payload: any) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/user/initiate`,
    requestOptions
  );
}

export async function getAllProposals(type: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/proposals/${type}`,
    requestOptions
  );
}

export async function getAllMyProposals(account: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/proposal/wallet/${account}`,
    requestOptions
  );
}

export async function getProposalById(proposalId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/proposal/${proposalId}`,
    requestOptions
  );
}

export async function getVotesByProposal(proposalId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/proposal/votes/${proposalId}`,
    requestOptions
  );
}

export async function getVoteDetailsByProposal(proposalId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    cache: "no-store",
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/proposal/voters/${proposalId}`,
    requestOptions
  );
}

export async function createProposal(payload: any) {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  };

  return await fetch(
    `${process.env.HIVE_MIND_BASE_URL}/api/user/propose`,
    requestOptions
  );
}
