const getAllProjects = "SELECT * , experimental_strftime(startdate::date, '%Y-%m-%d') startdate, experimental_strftime(throwndate::date, '%Y-%m-%d') throwndate, experimental_strftime(trimmeddate::date, '%Y-%m-%d') trimmeddate, experimental_strftime(bisquedate::date, '%Y-%m-%d') bisquedate, experimental_strftime(glazeddate::date, '%Y-%m-%d') glazeddate, experimental_strftime(glazefireddate::date, '%Y-%m-%d') glazefireddate FROM projects2 where user_id=$1 ORDER BY projectname";
const getProjectById = "SELECT *, experimental_strftime(startdate::date, '%Y-%m-%d') startdate, experimental_strftime(throwndate::date, '%Y-%m-%d') throwndate, experimental_strftime(trimmeddate::date, '%Y-%m-%d') trimmeddate, experimental_strftime(bisquedate::date, '%Y-%m-%d') bisquedate, experimental_strftime(glazeddate::date, '%Y-%m-%d') glazeddate, experimental_strftime(glazefireddate::date, '%Y-%m-%d') glazefireddate FROM projects2 WHERE id=$1 AND user_id=$2 ORDER BY projectname";

// , TO_CHAR(startdate::date, 'dd/mm/yyyy') startdate, TO_CHAR(throwndate::date, 'dd/mm/yyyy') throwndate, TO_CHAR(trimmeddate::date, 'dd/mm/yyyy') trimmeddate, TO_CHAR(bisquedate::date, 'dd/mm/yyyy') bisquedate, TO_CHAR(glazeddate::date, 'dd/mm/yyyy') glazeddate, TO_CHAR(glazefireddate::date, 'dd/mm/yyyy') glazefireddate
// , TO_CHAR(startdate::date, 'dd/mm/yyyy') startdate, TO_CHAR(throwndate::date, 'dd/mm/yyyy') throwndate, TO_CHAR(trimmeddate::date, 'dd/mm/yyyy') trimmeddate, TO_CHAR(bisquedate::date, 'dd/mm/yyyy') bisquedate, TO_CHAR(glazeddate::date, 'dd/mm/yyyy') glazeddate, TO_CHAR(glazefireddate::date, 'dd/mm/yyyy') glazefireddate
// experimental_strftime(created_at, '%Y-%m-%d') to_char does not work in cockroachdb

const checkExistingProjects = "SELECT * FROM projects2 WHERE projectname=$1";

const addNewProject =
    // "INSERT INTO projects2 (projectname, projectdesc, thrown, trimmed, bisque, glazed, glazefired, user_id, imgurl) VALUES ($1, $2, $3, $4, $5, $6 ,$7 ,$8 ,$9)";
    "INSERT INTO projects2 (projectname, projectdesc, thrown, trimmed, bisque, glazed, glazefired, formclay, claytype, startweightclay, dimensionsheight, dimensionswidth, dimensionslength, glazetype, notes, imgurl,user_id) VALUES ($1, $2, $3, $4, $5, $6 ,$7 ,$8 ,$9, $10, $11, $12, $13, $14, $15, $16, $17)  RETURNING *";


const editProject =
    "UPDATE projects2 SET projectname= $2, projectdesc= $3, formclay = $4, claytype = $5, startweightclay = $6, dimensionsheight = $7, dimensionswidth = $8, dimensionslength = $9, glazetype = $10, notes = $11 WHERE id = $1 AND user_id=$12 RETURNING *";

const updateProjectParameters =
    "UPDATE projects2 SET thrown = $2,  trimmed = $3, bisque = $4, glazed = $5, glazefired = $6 WHERE id = $1";


const searchString =
    "SELECT * FROM projects2 WHERE $1 IN (projectname, projectdesc) AND user_id=$2";

const deleteProject = "DELETE FROM projects2 WHERE id = $1 RETURNING *";

module.exports = {
    getAllProjects,
    getProjectById,
    checkExistingProjects,
    addNewProject,
    editProject,
    updateProjectParameters,
    searchString,
    deleteProject,
};


