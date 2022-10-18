const getAllProjects = "SELECT *, TO_CHAR(startdate::date, 'dd/mm/yyyy') startdate, TO_CHAR(throwndate::date, 'dd/mm/yyyy') throwndate, TO_CHAR(trimmeddate::date, 'dd/mm/yyyy') trimmeddate, TO_CHAR(bisquedate::date, 'dd/mm/yyyy') bisquedate, TO_CHAR(glazeddate::date, 'dd/mm/yyyy') glazeddate, TO_CHAR(glazefireddate::date, 'dd/mm/yyyy') glazefireddate FROM projects2 where user_id=$1 ORDER BY projectname";
const getProjectById = "SELECT *, TO_CHAR(startdate::date, 'dd/mm/yyyy') startdate, TO_CHAR(throwndate::date, 'dd/mm/yyyy') throwndate, TO_CHAR(trimmeddate::date, 'dd/mm/yyyy') trimmeddate, TO_CHAR(bisquedate::date, 'dd/mm/yyyy') bisquedate, TO_CHAR(glazeddate::date, 'dd/mm/yyyy') glazeddate, TO_CHAR(glazefireddate::date, 'dd/mm/yyyy') glazefireddate FROM projects2 WHERE id=$1 AND user_id=$2 ORDER BY projectname";

const checkExistingProjects = "SELECT * FROM projects2 WHERE projectname=$1";

const addNewProject =
    // "INSERT INTO projects2 (projectname, projectdesc, thrown, trimmed, bisque, glazed, glazefired, user_id, imgurl) VALUES ($1, $2, $3, $4, $5, $6 ,$7 ,$8 ,$9)";
    "INSERT INTO projects2 (projectname, projectdesc, thrown, trimmed, bisque, glazed, glazefired, user_id, imgurl, formclay, claytype, startweightclay, dimensionsheight, dimensionswidth, dimensionslength, glazetype, notes) VALUES ($1, $2, $3, $4, $5, $6 ,$7 ,$8 ,$9, $10, $11, $12, $13, $14, $15, $16, $17)";

const editProject =
    "UPDATE projects2 SET projectname= $2, projectdesc= $3, imgurl = $4, formclay = $5, claytype = $6, startweightclay = $7, dimensionsheight = $8, dimensionswidth = $9, dimensionslength = $10, glazetype = $11, notes = $12 WHERE id = $1 AND user_id=$13";

const updateProjectParameters =
    "UPDATE projects2 SET thrown = $2,  trimmed = $3, bisque = $4, glazed = $5, glazefired = $6 WHERE id = $1";


const searchString =
    "SELECT * FROM projects2 WHERE $1 IN (projectname, projectdesc) AND user_id=$2";

const deleteProject = "DELETE FROM projects2 WHERE id = $1";

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


