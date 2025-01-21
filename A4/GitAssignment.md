1.Suppose you had a file, called first.md, and you made a copy of this file, named it second.md and made some changes to it. Next, suppose you ran diff-u first.md second.md.
Based on the diff output, the content of second.md should be:
A
B
$
C
D
#
%
E
F
This is because the diff output shows: keeping A and B, adding $, keeping C, removing D, adding # and %, then keeping E and F.
2. (True or False) If you accidentally add a file to the staging area, you can remove it using git reset. For example, if you accidentally add thrid.md, but don’t want it to be committed yet, run git reset thrid.md and the file will be removed from the staging area, but it will still be in your working directory .
True. Using git reset can indeed remove a file from the staging area while keeping it in your working directory. 
3. (True or False) The commands git reset and git revert can only be used to undo commits in the git repository.
False. git reset and git revert are not only used for undoing commits. For example, git reset can also be used to manipulate the staging area. 
4. (True or False) The commands git checkout can be used to roll back to a certain commit hash (check the documentation if you are unsure).
True. git checkout can be used to roll back to a specific commit hash. 
5. (True or False) We cannot commit changes in the working directory directly to the repo without adding it to the staging index first (read the documentation if you are unsure).
True. In Git, changes must first be added to the staging index before they can be committed to the repository. This is Git's basic workflow. 
6. (True or False) git log-p and git log will give you the same output.
False. git log -p shows detailed differences (patches) for each commit, while regular git log only shows basic commit information. 
7. (True or False) git log--oneline and git log--statwillgive you the same output.
False. git log --oneline displays simplified one-line commit messages, while git log --stat shows file modification statistics for each commit. 
8. (True or False) It is recommended that in most cases we should use git revert rather than git reset to undo commits because git revert is safer.
True. It is recommended to use git revert rather than git reset to undo commits because git revert is safer. It creates new commits to undo changes rather than directly modifying history.
