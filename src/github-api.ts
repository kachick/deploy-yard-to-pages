import type { getOctokit } from '@actions/github';
import type { Endpoints } from '@octokit/types';

type Octokit = ReturnType<typeof getOctokit>;

// REST: https://docs.github.com/en/rest/reference/actions#list-jobs-for-a-workflow-run
// GitHub does not provide to get job_id, we should get from the run_id https://github.com/actions/starter-workflows/issues/292#issuecomment-922372823
const listWorkflowRunsRoute = 'GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs' as const;
type ListWorkflowRunsRoute = typeof listWorkflowRunsRoute;
type ListWorkflowRunsResponse = Endpoints[ListWorkflowRunsRoute]['response'];
type ListWorkflowRunsParams = Endpoints[ListWorkflowRunsRoute]['parameters'];

type JobID = ListWorkflowRunsResponse['data']['jobs'][number]['id'];

export async function fetchJobIDs(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  octokit: Octokit,
  params: Readonly<Pick<ListWorkflowRunsParams, 'owner' | 'repo' | 'run_id'>>,
): Promise<Set<JobID>> {
  return new Set(
    await octokit.paginate(
      octokit.rest.actions.listJobsForWorkflowRun,
      {
        ...params,
        // eslint-disable-next-line camelcase
        per_page: 100,
        filter: 'latest',
      },
      (resp) => resp.data.map((job) => job.id),
    ),
  );
}
