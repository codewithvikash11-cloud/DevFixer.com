import { getComments, updateCommentStatus, deleteComment } from './actions/comments';

export const commentsService = {
    getComments: async (status, limit) => getComments(status, limit),
    updateStatus: async (id, status) => updateCommentStatus(id, status),
    deleteComment: async (id) => deleteComment(id)
};
